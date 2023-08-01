import "./App.css";
import { useEffect, useState } from "react";
  // 自定义hook
const useCount = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You click ${count} times`
    console.log(count)
  })

  return [count, setCount]
}




// side effect: 和外部变量的交互
// 1，修改dom
// 2，修改全局变量，document， window
// 3，ajax
// 4，计时器
// 5, 存储相关

// useEffect是在dom构建之后起作用
//dom 构建之前操作副作用：useLayoutEffect
function App() {
  const [count, setCount] = useState(() => {
    return 0;
  });
  console.log("render");
  useEffect(() => {
    console.log("timer start");
    let timer = setInterval(() => {
      console.log("timer enter");
      setCount((count) => count + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
    // console.log("effect");
    // document.title = `You click ${count} times`
  });

  //功能一：简单合并生命周期
  //componentDidMount and componentDidUpdate

  // 功能二：模拟componentWillUnmount, 组建销毁后也会执行
  // 清理函数，从第二次开始，在运行副作用之前运行
  // demo:
  // useEffect(() => {
  //   let timer = setInterval(() => {
  //     setCount(count +1);
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer)
  //   }
  // });

  // 需求： 只有一个计时器， 即只在didMount时生成计时器
  // [] 空依赖项 -》 只会在DidMount时,并且setCount使用箭头函数
  // useEffect(() => {
  //   console.log("timer start")
  //   let timer = setInterval(() => {
  //     console.log("timer enter")
  //     setCount(count => count + 1);
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };

  // }, []);

  // [] 有依赖项， 依赖项改变即重新执行effect


  
  

  return (
    <div className="App">
      <div>{count}</div>
      <button onClick={() => setCount((count) => count + 1)}>add</button>
    </div>
  );
}

export default App;
