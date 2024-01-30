import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState('')

  let SHAKETHRESHOLD = 4000;
  let lastUpdate = 0;
  let x,
    y,
    z,
    lastX = 0,
    lastY = 0,
    lastZ = 0;

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener(
        "devicemotion",
        deviceMotionHandler,
        false
      );
    } else {
      alert("该浏览器不支持摇一摇功能");
    }
  }, [])

  function deviceMotionHandler(eventData) {
    let acceleration = eventData.acceleration;
    let curTime = new Date().getTime();

    setCount(`${acceleration.x}-${acceleration.y}-${acceleration.z}`);

    if (curTime - lastUpdate > 50) {
      let diffTime = curTime - lastUpdate;
      lastUpdate = curTime;
      x = acceleration.x;
      y = acceleration.y;
      z = acceleration.z;

     
      let speed = (Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime) * 10000;
      if (speed > SHAKETHRESHOLD) {
        setTimeout(() => {
          alert("恭喜你，摇到漂亮妹纸一枚!"); // Do something
        }, 1000);
      }
    }
    lastX = x;
    lastY = y;
    lastZ = z;
  }

  return (
    <button>{count}</button>
  )
}

export default App
