# woven-loader
Webpack Loader for WovenJS
***
woven-loader works in concert with Webpack's worker-loader to convert pure functions written for node into web workers. Optionally the files then get converted to BLOBs that get attached to your bundle and triggered by WovenJS's run() function.
***
## Installing
```
npm install --save-dev woven-loader
```
You may also want to include these recommended dependencies:
```
npm install --save-dev worker-loader babel-loader
```
## Inline Transformation
To convert your node functionality and inject the BLOB refrences into WovenJS include the following in your client-side javascript:
```javascript
import wovenWorker from 'worker-loader?inline=true&name=woven-worker.js!babel-loader!woven-loader!' + /* path to your functions file */;

const woven = new Woven();
woven.connect(wovenWorker);
```
