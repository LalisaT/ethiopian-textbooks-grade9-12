import os

with open('firebase-debug.log', 'rb') as f:
    f.seek(0, os.SEEK_END)
    size = f.tell()
    # Read last 30 KB
    read_size = min(size, 30000)
    f.seek(size - read_size)
    lines = f.read().decode('utf-8', errors='ignore').splitlines()

for line in lines[-25:]:
    print(line)
