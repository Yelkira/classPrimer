import React from "react";
import "./App.css"
import store from "./store";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            out: "0"
        }
        this.refOutPut = React.createRef()
    }

    tapeNumber(value) {
        let currentValue = value
        let outPut = this.refOutPut.current

        this.setState({
            out: currentValue
        })

        if (outPut.value === "0") {
            outPut.value = ""
        }
        outPut.value += currentValue

    }

    tapeOperation(value) {
        let outPut = this.refOutPut.current

        if (value === "CE") {
            if (outPut.value.length === 1) {
                outPut.value = "0"
            } else {
                outPut.value = outPut.value.substring(0, outPut.value.length - 1)
            }
        } else if ( value === "C"){
            outPut.value = "0"
        } else if (value === "="){
            try {
                outPut.value = eval(outPut.value)
            } catch {
                outPut.value = "Недопустимое значение"
                setTimeout(()=>{
                    outPut.value = "0"
                }, 1500)
            }

        }

    }

    render() {
        return (
            <div className={"container"}>
                <div className={"output"}>
                    <input ref={this.refOutPut} type="text" defaultValue={this.state.out}/>
                </div>
                <div className={"buttons"}>
                    {store.buttons.map((b, i) => <button key={i} onClick={() => this.tapeNumber(b.val)}>{b.val}</button>)}
                    {store.operations.map((o,i) => <button key={i} onClick={() => this.tapeOperation(o.val)}>{o.val}</button>)}
                </div>
            </div>
        )
    }
}

export default App