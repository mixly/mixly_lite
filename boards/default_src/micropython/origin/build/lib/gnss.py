"""
GNSS

Micropython	library for the GNSS(NMEA0183/GPS,DBS)
=======================================================

#Preliminary composition	  	    			20230314

@dahanzimin From the Mixly Team
"""
from ubinascii import unhexlify

class NMEA0183:
	def __init__(self, uart, baudrate=9600, timeout=200):
		self._uart=uart
		self._uart.init(baudrate=baudrate, timeout=timeout, rxbuf=1024)
		self.time=[None, None, None, None, None, None, None, 0]
		self.locate=['', None, '', None, None, None, None]		#0'1经度,2'3纬度,4海拔m,5速度m/s,6航向°
		self.status=[False, ' ', 0]		#有效标注,定位模式,卫星量

	def _crc8(self, buffer):
		'''对数据进行CRC校验'''
		crc = 0x00
		for byte in buffer:
			crc ^= byte
		return crc & 0xff 

	def	_judge(self, buffer, dlen):
		try:
			data=buffer.strip().decode().split(',')
			if len(data) == dlen:
				if unhexlify(data[-1][-2:])[0] == self._crc8(buffer[1:-5]):
					return True,data
			return False,None
		except :
			return False,None

	def any(self):
		flag_rmc,flag_gga=False,False
		while self._uart.any():
			_data=self._uart.readline()
			if b'$GNGGA' in _data:
				flag_gga,data=self._judge(_data, 15)
				#print("GGA----",flag_gga)
				if flag_gga:
					self.time[4]= int(data[1][0:2]) if data[1] else None
					self.time[5]= int(data[1][2:4]) if data[1] else None
					self.time[6]= int(data[1][4:6]) if data[1] else None
					self.locate[0]= data[5]
					self.locate[1]= int(data[4][:3])+int(data[4][3:].replace('.',''))/6000000 if data[4] else None
					self.locate[2]= data[3]
					self.locate[3]= int(data[2][:2])+int(data[2][2:].replace('.',''))/6000000 if data[2] else None
					self.locate[4]= float(data[9]) if data[3] else None
					self.status[0]= False if '0' in data[6] else True
					self.status[2]= int(data[7])
			if b'$GNRMC' in _data:
				flag_rmc,data=self._judge(_data, 14)
				#print("RMC----",flag_rmc)
				if flag_rmc:
					self.time[0]= int(data[9][4:6])+2000 if data[9] else None
					self.time[1]= int(data[9][2:4])      if data[9] else None
					self.time[2]= int(data[9][0:2])      if data[9] else None
					self.time[4]= int(data[1][0:2])+8    if data[1] else None
					self.time[5]= int(data[1][2:4])      if data[1] else None
					self.time[6]= int(data[1][4:6])      if data[1] else None
					self.locate[0]= data[6]
					self.locate[1]= int(data[5][:3])+int(data[5][3:].replace('.',''))/6000000 if data[5] else None
					self.locate[2]= data[4]
					self.locate[3]= int(data[3][:2])+int(data[3][2:].replace('.',''))/6000000 if data[3] else None
					self.locate[5]= round(float(data[7])*0.514, 2) if data[7] else None
					self.locate[6]= float(data[8]) if data[8] else None
					self.status[0]= False if 'V' in data[2] else True
					self.status[1]= data[12]
		return flag_rmc | flag_gga
