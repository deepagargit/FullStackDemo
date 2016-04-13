import time
import json
import requests

from threading import Thread

def doDeploy(data):
	print("Data .......")

	print("Description ", data['description'], data['priority'])

	tool_data = data['tool_data']

	for tool_item in tool_data:
		print("Tool ", tool_item['name'])

def deploy():
	resp = requests.get('http://127.0.0.1:1236/deploys')
	if resp.status_code != 200:
		# something went wrong
		raise ApiError('GET /tasks/ ()'.format(resp.status_code))
	
	for work_item in resp.json():
		doDeploy(work_item)
		#print('{} {}'.format(work_item['description'], work_item['priority']))

	time.sleep(1)

	pass

def main():
	print("Start")
	threads = []

	t = Thread(target=deploy, args=())
	threads.append(t)

	# Start all threads
	for x in threads:
		x.start()
	
	# Wait for all the threads to finish
	for y in threads:
		y.join()

	print("Exiting")

main()