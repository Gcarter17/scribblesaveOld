import React, { Component, useEffect, useContext, useState } from 'react';
import RichTextEditor from 'react-rte';
import ContactContext from "../../context/contact/contactContext";

// const MyEditor = ({ value, setValue }) => {
//     const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString(value, 'markdown'));
//     // console.log(editorValue.toString("html"), "editorValue")
//     console.log(value, "editorValue")




//     // useEffect(() => {
//     //     // setEditorValue({ value: current });
//     //     setEditorValue({ loaded: true })
//     // });

//     const handleChange = value => {
//         setEditorValue(value);
//         setValue(value.toString("markdown"));
//     };



//     return (
{/* <RichTextEditor
    value={editorValue}
    onChange={handleChange}
    required
    type="string"
    variant="filled"
    style={{ minHeight: 410 }}
/> */}
//     );
// }


class MyEditor extends Component {

    state = {
        value: RichTextEditor.createValueFromString(`${this.props.content}`, "markdown"),
        // value: RichTextEditor.createEmptyValue(),
    }

    // componentDidMount() {
    //     if (this.state.value !== this.props.content) {

    //     }
    //     let value = this.props.content
    //     this.setState({ value })
    //     // console.log(content)
    // }

    onChange = (value) => {
        this.setState({ value });
        if (this.props.onChange) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            this.props.onChange(
                value.toString('html')
            );
        }
        console.log(this.state.value.toString('html'), 'THIS.STATE.VALUE')

        // this.props.onChange(value)
    };

    // async componentDidMount() {
    //     let source = this.props.value
    //     let oldValue = this.state.value
    //     this.setState({
    //         value: oldValue.setContentFromString(source, 'html')
    //     })
    //     // this.setState({ value: this.props.value })
    //     this.setState({ loaded: true })

    // }



    render() {

        return (
            <RichTextEditor
                className={this.props.styles}
                // value={this.state.value.toString('html')}
                value={this.state.value}
                onChange={this.onChange}
                readOnly={this.props.readOnly}
            />
        );
    }
}


export default MyEditor

