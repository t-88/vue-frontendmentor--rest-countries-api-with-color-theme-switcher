import sys
import os

if len(sys.argv) == 1:
	print("put svg file as arg")
	exit() 

for i in range(1,len(sys.argv)):
	path = sys.argv[i]
	print(path)

	fileName = os.path.basename(path)
	if not fileName.endswith(".svg"):
		print("it needs to be svg format")
		exit()

	data = ""
	with open(path,"r") as f:
	 	data = f.read()
	 	data = data.replace("\n","").replace("\t","")

	with open(path,"w") as f:
		f.write(data)