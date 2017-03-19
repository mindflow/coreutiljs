@echo off

echo "Installing rollup"
CMD /C npm install rollup -g

echo "Installing rollup multi entry"
CMD /C npm install rollup-plugin-multi-entry -g

echo "Install developer deps"
CMD /C npm install
