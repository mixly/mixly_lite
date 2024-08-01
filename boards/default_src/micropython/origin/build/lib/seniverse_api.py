"""
Seniverse Weather API

MicroPython library for Seniverse Weather API
=======================================================

#Preliminary composition       	20220420
#https://www.seniverse.com/api

dahanzimin From the Mixly Team
"""

import json
import urequests

_weather_now="http://api.seniverse.com/v3/weather/now.json?"			#天气实况 
_weather_daily="http://api.seniverse.com/v3/weather/daily.json?" 		#逐日天气预报
_weather_hourly="http://api.seniverse.com/v3/weather/hourly.json?"		#逐时天气预报
_weather_alarm="http://api.seniverse.com/v3/weather/alarm.json?"		#气象灾害预警
_life_suggestion="http://api.seniverse.com/v3/life/suggestion.json?"	#生活指数
_air_now="http://api.seniverse.com/v3/air/now.json?"					#空气质量实况	
_air_daily="http://api.seniverse.com/v3/air/daily.json?"				#逐日空气质量预报
_tide_daily="http://api.seniverse.com/v3/tide/daily.json?"				#逐小时潮汐预报
_geo_sun="http://api.seniverse.com/v3/geo/sun.json?"					#日出日落
_geo_moon="http://api.seniverse.com/v3/geo/moon.json?"					#月出月落和月相
_location_search="http://api.seniverse.com/v3/location/search.json?"	#城市搜索

#数据请求
def _urequests_api(url):
	try:
		results=json.loads(urequests.post(url).text)
	except Exception as e:
		raise RuntimeError("API request failed or WiFi is not connected",e)
		
	if "status" in results.keys():
		raise ValueError(results["status"])
	if "results" in results.keys():
		return results["results"]
	
#天气实况		https://docs.seniverse.com/api/weather/now.html
def weather_now(key,location):
	url="{}key={}&location={}".format(_weather_now,key,location)
	results=_urequests_api(url)[0]
	return results['now']


#逐日天气预报		https://docs.seniverse.com/api/weather/daily.html
def weather_daily(key,location,days=1):
	url="{}key={}&location={}&days={}".format(_weather_daily,key,location,days)
	results=_urequests_api(url)[0]
	data=[]
	for i in range(len(results['daily'])):
		data.append(results['daily'][i])
	return tuple(data)

#逐时天气预报		https://docs.seniverse.com/api/weather/hourly.html
def weather_hourly(key,location,hours=1):
	url="{}key={}&location={}&hours={}".format(_weather_hourly,key,location,hours)
	results=_urequests_api(url)[0]
	data=[]
	for i in range(len(results['hourly'])):
		data.append(results['hourly'][i])
	return tuple(data)

#气象灾害预警		https://docs.seniverse.com/api/weather/alarm.html
def weather_alarm(key,location):
	url="{}key={}&location={}".format(_weather_alarm,key,location)
	results=_urequests_api(url)[0]
	data=[]
	for i in range(len(results['alarms'])):
		data.append(results['alarms'][i])
	return tuple(data)

#生活指数			https://docs.seniverse.com/api/life/suggestion.html
def life_suggestion(key,location,days=1):
	url="{}key={}&location={}&days={}".format(_life_suggestion,key,location,days)
	results=_urequests_api(url)[0]
	data=[]
	for i in range(len(results['suggestion'])):
		data.append(results['suggestion'][i])
	return tuple(data)

#空气质量实况		https://docs.seniverse.com/api/air/now.html
def air_now(key,location):
	url="{}key={}&location={}&scope=city".format(_air_now,key,location)
	results=_urequests_api(url)[0]
	return results['air']['city']
	
#逐日空气质量预报	https://docs.seniverse.com/api/air/daily5d.html
def air_daily(key,location,days=1):
	url="{}key={}&location={}&days={}".format(_air_daily,key,location,days)
	results=_urequests_api(url)[0]
	data=[]
	for i in range(len(results['daily'])):
		data.append(results['daily'][i])
	return tuple(data)

#逐时潮汐预报		https://docs.seniverse.com/api/ocean/tide.html
def tide_daily(key,location):
	url="{}key={}&location={}&days=1".format(_tide_daily,key,location)
	results=_urequests_api(url)[0]
	data=[]
	for i in range(len(results['ports'])):
		data.append({'port':results['ports'][i]['port'],
					'tide':results['ports'][i]['data'][0]['tide'],
					'range':results['ports'][i]['data'][0]['range']})
	return tuple(data)

#日出日落			https://docs.seniverse.com/api/geo/sun.html
def geo_sun(key,location,days=1):
	url="{}key={}&location={}&days={}".format(_geo_sun,key,location,days)
	results=_urequests_api(url)[0]
	data=[]
	for i in range(len(results['sun'])):
		data.append(results['sun'][i])
	return tuple(data)
	
#月出月落和月相 	https://docs.seniverse.com/api/geo/moon.html
def geo_moon(key,location,days=1):
	url="{}key={}&location={}&days={}".format(_geo_moon,key,location,days)
	results=_urequests_api(url)[0]
	data=[]
	for i in range(len(results['moon'])):
		data.append(results['moon'][i])
	return tuple(data)
	
#城市搜索			https://docs.seniverse.com/api/fct/search.html
def location_search(key,location):
	url="{}key={}&q={}&limit=50".format(_location_search,key,location)
	results=_urequests_api(url)
	data=[]
	for i in range(len(results)):
		data.append(results[i])
	return tuple(data)
