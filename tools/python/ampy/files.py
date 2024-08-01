# Adafruit MicroPython Tool - File Operations
# Author: Tony DiCola
# Copyright (c) 2016 Adafruit Industries
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
import ast
import textwrap
import binascii
import sys

from pyboard import PyboardError


BUFFER_SIZE = 32  # Amount of data to read or write to the serial port at a time.
# This is kept small because small chips and USB to serial
# bridges usually have very small buffers.


class DirectoryExistsError(Exception):
    pass


class Files(object):
    """Class to interact with a MicroPython board files over a serial connection.
    Provides functions for listing, uploading, and downloading files from the
    board's filesystem.
    """

    def __init__(self, pyboard):
        """Initialize the MicroPython board files class using the provided pyboard
        instance.  In most cases you should create a Pyboard instance (from
        pyboard.py) which connects to a board over a serial connection and pass
        it in, but you can pass in other objects for testing, etc.
        """
        self._pyboard = pyboard

    def get(self, filename):
        """Retrieve the contents of the specified file and return its contents
        as a byte string.
        """
        # Open the file and read it a few bytes at a time and print out the
        # raw bytes.  Be careful not to overload the UART buffer so only write
        # a few bytes at a time, and don't use print since it adds newlines and
        # expects string data.
        command = """
            import sys
            import ubinascii
            with open('{0}', 'rb') as infile:
                while True:
                    result = infile.read({1})
                    if result == b'':
                        break
                    len = sys.stdout.write(ubinascii.hexlify(result))
        """.format(
            filename, BUFFER_SIZE
        )
        self._pyboard.enter_raw_repl()
        try:
            out = self._pyboard.exec_(textwrap.dedent(command))
        except PyboardError as ex:
            # Check if this is an OSError #2, i.e. file doesn't exist and
            # rethrow it as something more descriptive.
            try:
                if ex.args[2].decode("utf-8").find("OSError: [Errno 2] ENOENT") != -1:
                    raise RuntimeError("No such file: {0}".format(filename))
                else:
                    raise ex
            except UnicodeDecodeError:
                raise ex
        self._pyboard.exit_raw_repl()
        return binascii.unhexlify(out)

    def ls(self, directory="/", long_format=True, recursive=False, exit_repl=True):
        """List the contents of the specified directory (or root if none is
        specified).  Returns a list of strings with the names of files in the
        specified directory.  If long_format is True then a list of 2-tuples
        with the name and size (in bytes) of the item is returned.  Note that
        it appears the size of directories is not supported by MicroPython and
        will always return 0 (i.e. no recursive size computation).
        """

        # Disabling for now, see https://github.com/adafruit/ampy/issues/55.
        # # Make sure directory ends in a slash.
        # if not directory.endswith("/"):
        #     directory += "/"

        # Make sure directory starts with slash, for consistency.
        if not directory.startswith("/"):
            directory = "/" + directory

        command = """\
                try:
                    import os
                except ImportError:
                    import uos as os\n"""

        if recursive:
            command += """\
                def listdir(directory):
                    result = set()

                    def _listdir(dir_or_file):
                        try:
                            # if its a directory, then it should provide some children.
                            children = os.listdir(dir_or_file)
                        except OSError:
                            # probably a file. run stat() to confirm.
                            os.stat(dir_or_file)
                            result.add(dir_or_file) 
                        else:
                            # probably a directory, add to result if empty.
                            if children:
                                # queue the children to be dealt with in next iteration.
                                for child in children:
                                    # create the full path.
                                    if dir_or_file == '/':
                                        next = dir_or_file + child
                                    else:
                                        next = dir_or_file + '/' + child
                                    
                                    _listdir(next)
                            else:
                                result.add(dir_or_file)

                    _listdir(directory)
                    return sorted(result)\n"""
        else:
            command += """\
                def check_path(path):
                    try:
                        stat = os.stat(path)
                        # The first element of stat contains the file type and permission information
                        # The mode index of the tuple returned by os.stat() is 0
                        mode = stat[0]
                        # To determine whether it is a directory, check the directory bit in stat mode
                        if mode & 0o170000 == 0o040000:
                            if len(os.listdir(path)):
                                return 'dir'
                            else:
                                return 'empty dir'
                        # To determine whether it is a file, check the file position in stat mode
                        elif mode & 0o170000 == 0o100000:
                            return 'file'
                        else:
                            return 'special file'
                    except OSError:
                        return 'none'

                def listdir(directory):
                    output = []
                    if directory == '/':
                        dirs = sorted([directory + f for f in os.listdir(directory)])
                    else:
                        dirs = sorted([directory + '/' + f for f in os.listdir(directory)])

                    for dir in dirs:
                        output.append([dir, check_path(dir)])
                    return output\n"""

        # Execute os.listdir() command on the board.
        if long_format:
            command += """
                r = []
                for f in listdir('{0}'):
                    size = os.stat(f)[6]
                    r.append('{{0}} - {{1}} bytes'.format(f, size))
                print(r)
            """.format(
                directory
            )
        else:
            command += """
                print(listdir('{0}'))
            """.format(
                directory
            )
        self._pyboard.enter_raw_repl()
        try:
            out = self._pyboard.exec_(textwrap.dedent(command))
        except PyboardError as ex:
            # Check if this is an OSError #2, i.e. directory doesn't exist and
            # rethrow it as something more descriptive.
            if ex.args[2].decode("utf-8").find("OSError: [Errno 2] ENOENT") != -1:
                raise RuntimeError("No such directory: {0}".format(directory))
            else:
                raise ex
        if exit_repl:
            self._pyboard.exit_raw_repl()
        # Parse the result list and return it.
        return ast.literal_eval(out.decode("utf-8"))

    def getFilesInfo(self, directory="/", recursive=False):
        """List the contents of the specified directory (or root if none is
        specified).  Returns a list of strings with the names of files in the
        specified directory.  If long_format is True then a list of 2-tuples
        with the name and size (in bytes) of the item is returned.  Note that
        it appears the size of directories is not supported by MicroPython and
        will always return 0 (i.e. no recursive size computation).
        """

        # Disabling for now, see https://github.com/adafruit/ampy/issues/55.
        # # Make sure directory ends in a slash.
        # if not directory.endswith("/"):
        #     directory += "/"

        # Make sure directory starts with slash, for consistency.
        # if not directory.startswith("/"):
        #     directory = "/" + directory

        command = """\
                try:
                    import os
                except ImportError:
                    import uos as os\n"""

        if recursive:
            command += """\
                def listdir(directory):
                    result = set()

                    def _listdir(dir_or_file):
                        try:
                            # if its a directory, then it should provide some children.
                            children = os.listdir(dir_or_file)
                        except OSError:
                            # probably a file. run stat() to confirm.
                            os.stat(dir_or_file)
                            result.add(dir_or_file) 
                        else:
                            # probably a directory, add to result if empty.
                            if children:
                                # queue the children to be dealt with in next iteration.
                                for child in children:
                                    # create the full path.
                                    if dir_or_file == '/':
                                        next = dir_or_file + child
                                    else:
                                        next = dir_or_file + '/' + child
                                    
                                    _listdir(next)
                            else:
                                result.add(dir_or_file)

                    _listdir(directory)
                    return sorted(result)\n"""
        else:
            command += """\
                def listdir(directory):
                    try:
                        if directory == '/':
                            return sorted([directory + f for f in os.listdir(directory)])
                        else:
                            return sorted([directory + '/' + f for f in os.listdir(directory)])
                    except:
                        return sorted([f for f in os.listdir()])\n"""

        # Execute os.listdir() command on the board.
        # 当command执行出错时执行command1
        command2 = command
        command2 += """
                r = []
                for f in listdir('{0}'):
                    try:
                        size = os.stat(f)[6]
                    except:
                        size = os.size(f)
                    r.append([f, size])
                print(r)
            """.format(
            (directory if directory else "/")
        )
        command += """
                r = []
                for f in listdir('{0}'):
                    try:
                        size = os.stat(f)[6]
                    except:
                        size = os.size(f)
                    r.append([f, size])
                print(r)
            """.format(
            directory
        )
        try:
            out = self._pyboard.exec_(textwrap.dedent(command))
        except PyboardError as ex:
            out = self._pyboard.exec_(textwrap.dedent(command2))
            # Check if this is an OSError #2, i.e. directory doesn't exist and
            # rethrow it as something more descriptive.
        except PyboardError as ex:
            if ex.args[2].decode("utf-8").find("OSError: [Errno 2] ENOENT") != -1:
                raise RuntimeError("No such directory: {0}".format(directory))
            else:
                raise ex
        # Parse the result list and return it.
        try:
            return ast.literal_eval(out.decode("utf-8"))
        except:
            return ''

    def mkdir(self, directory, exists_okay=False):
        """Create the specified directory.  Note this cannot create a recursive
        hierarchy of directories, instead each one should be created separately.
        """
        # Execute os.mkdir command on the board.
        command = """
            try:
                import os
            except ImportError:
                import uos as os
            os.mkdir('{0}')
        """.format(
            directory
        )
        self._pyboard.enter_raw_repl()
        try:
            out = self._pyboard.exec_(textwrap.dedent(command))
        except PyboardError as ex:
            # Check if this is an OSError #17, i.e. directory already exists.
            if ex.args[2].decode("utf-8").find("OSError: [Errno 17] EEXIST") != -1:
                if not exists_okay:
                    raise DirectoryExistsError(
                        "Directory already exists: {0}".format(directory)
                    )
            else:
                raise ex
        self._pyboard.exit_raw_repl()

    def mkfile(self, file, exists_okay=False):
        command = """
            try:
                import os
            except ImportError:
                import uos as os

            try:
                os.stat('{0}')
            except OSError:
                f = open('{0}', 'w')
                f.close()
        """.format(
            file
        )
        self._pyboard.enter_raw_repl()
        try:
            out = self._pyboard.exec_(textwrap.dedent(command))
        except PyboardError as ex:
                raise ex
        self._pyboard.exit_raw_repl()

    def put(self, filename, data, enter_repl=True, exit_repl=True):
        """Create or update the specified file with the provided data.
        """
        # Open the file for writing on the board and write chunks of data.
        if enter_repl:
            self._pyboard.enter_raw_repl()
        self._pyboard.exec_("f = open('{0}', 'wb')".format(filename))
        sys.stdout.write("Write " + filename)
        size = len(data)
        # Loop through and write a buffer size chunk of data at a time.
        for i in range(0, size, BUFFER_SIZE):
            chunk_size = min(BUFFER_SIZE, size - i)
            chunk = repr(data[i : i + chunk_size])
            # Make sure to send explicit byte strings (handles python 2 compatibility).
            if not chunk.startswith("b"):
                chunk = "b" + chunk
            self._pyboard.exec_("f.write({0})".format(chunk))
        self._pyboard.exec_("f.close()")
        sys.stdout.write(" Done!\n")
        if exit_repl:
            self._pyboard.exit_raw_repl()

    def putDir(self, fileNameList, dataList, enter_repl=True, exit_repl=True):
        """Create or update the specified file with the provided data.
        """
        # Open the file for writing on the board and write chunks of data.
        if enter_repl:
            self._pyboard.enter_raw_repl() 
        for i in range(0, len(fileNameList), 1):
            self._pyboard.exec_("f = open('{0}', 'wb')".format(fileNameList[i]))
            sys.stdout.write("Writing " + fileNameList[i])
            sys.stdout.flush()
            #print("write " + fileNameList[i])
            data = dataList[i]
            size = len(data)
            # Loop through and write a buffer size chunk of data at a time.
            for i in range(0, size, BUFFER_SIZE):
                chunk_size = min(BUFFER_SIZE, size - i)
                chunk = repr(data[i : i + chunk_size])
                # Make sure to send explicit byte strings (handles python 2 compatibility).
                if not chunk.startswith("b"):
                    chunk = "b" + chunk
                self._pyboard.exec_("f.write({0})".format(chunk))
            self._pyboard.exec_("f.close()")
            sys.stdout.write(" Done!\n")
            sys.stdout.flush()
        if exit_repl:
            self._pyboard.exit_raw_repl()

    def rm(self, filename):
        """Remove the specified file or directory."""
        command = """
            try:
                import os
            except ImportError:
                import uos as os
            os.remove('{0}')
        """.format(
            filename
        )
        self._pyboard.enter_raw_repl()
        try:
            out = self._pyboard.exec_(textwrap.dedent(command))
        except PyboardError as ex:
            message = ex.args[2].decode("utf-8")
            # Check if this is an OSError #2, i.e. file/directory doesn't exist
            # and rethrow it as something more descriptive.
            if message.find("OSError: [Errno 2] ENOENT") != -1:
                raise RuntimeError("No such file/directory: {0}".format(filename))
            # Check for OSError #13, the directory isn't empty.
            if message.find("OSError: [Errno 13] EACCES") != -1:
                raise RuntimeError("Directory is not empty: {0}".format(filename))
            else:
                raise ex
        self._pyboard.exit_raw_repl()

    def rmdir(self, directory, missing_okay=False):
        """Forcefully remove the specified directory and all its children."""
        # Build a script to walk an entire directory structure and delete every
        # file and subfolder.  This is tricky because MicroPython has no os.walk
        # or similar function to walk folders, so this code does it manually
        # with recursion and changing directories.  For each directory it lists
        # the files and deletes everything it can, i.e. all the files.  Then
        # it lists the files again and assumes they are directories (since they
        # couldn't be deleted in the first pass) and recursively clears those
        # subdirectories.  Finally when finished clearing all the children the
        # parent directory is deleted.
        command = """
            try:
                import os
            except ImportError:
                import uos as os
            def rmdir(directory):
                os.chdir(directory)
                for f in os.listdir():
                    try:
                        os.remove(f)
                    except OSError:
                        pass
                for f in os.listdir():
                    rmdir(f)
                os.chdir('..')
                os.rmdir(directory)
            rmdir('{0}')
        """.format(
            directory
        )
        self._pyboard.enter_raw_repl()
        try:
            out = self._pyboard.exec_(textwrap.dedent(command))
        except PyboardError as ex:
            message = ex.args[2].decode("utf-8")
            # Check if this is an OSError #2, i.e. directory doesn't exist
            # and rethrow it as something more descriptive.
            if message.find("OSError: [Errno 2] ENOENT") != -1:
                if not missing_okay:
                    raise RuntimeError("No such directory: {0}".format(directory))
            else:
                raise ex
        self._pyboard.exit_raw_repl()

    def rename(self, oldname, newname):
        command = """
            try:
                import os
            except ImportError:
                import uos as os

            os.rename('{0}', '{1}')
        """.format(
            oldname, newname
        )
        self._pyboard.enter_raw_repl()
        try:
            out = self._pyboard.exec_(textwrap.dedent(command))
        except PyboardError as ex:
            message = ex.args[2].decode("utf-8")
            raise ex
        self._pyboard.exit_raw_repl()

    def run(self, filename, wait_output=True, stream_output=True):
        """Run the provided script and return its output.  If wait_output is True
        (default) then wait for the script to finish and then return its output,
        otherwise just run the script and don't wait for any output.
        If stream_output is True(default) then return None and print outputs to
        stdout without buffering.
        """
        self._pyboard.enter_raw_repl()
        out = None
        if stream_output:
            self._pyboard.execfile(filename, stream_output=True)
        elif wait_output:
            # Run the file and wait for output to return.
            out = self._pyboard.execfile(filename)
        else:
            # Read the file and run it using lower level pyboard functions that
            # won't wait for it to finish or return output.
            with open(filename, "rb") as infile:
                self._pyboard.exec_raw_no_follow(infile.read())
        self._pyboard.exit_raw_repl()
        return out
