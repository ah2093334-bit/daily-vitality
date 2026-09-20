# Run after adding photos:  python update_photo_manifest.py
import os,json
d=os.path.join(os.path.dirname(os.path.abspath(__file__)),"assets","photos")
names=sorted(f[:-5] for f in os.listdir(d) if f.endswith(".webp"))
json.dump(names,open(os.path.join(d,"manifest.json"),"w"))
print(len(names),"photos listed")
