@echo off
echo "Build self"
CMD /C npm run build

echo "Install self"
CMD /C npm install .

echo "Test self"
CMD /C npm run test