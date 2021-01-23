import React,{useState,useRef} from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const SimpleFormExample = () => {
    // state = {
    //     formData: {
    //         email: '',
    //         password: '',
    //     },
    //     submitted: false,
    // }
    const aceEditorRef = useRef();
    const [formData, setFormData] = useState({email: '', passwod: ''});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        //const { formData } = this.state;
        const { name, value } = event.target;
        // formData[event.target.name] = event.target.value;
        // setFormData( formData[event.target.name] : event.target.value)
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        //this.setState({ formData });
    }

    const handleSubmit = () => {
        setSubmitted(true);
        // this.setState({ submitted: true }, () => {
        //     setTimeout(() => this.setState({ submitted: false }), 5000);
        // });
    }

        return (
            <ValidatorForm
                ref={aceEditorRef}
                onSubmit={handleSubmit}
            >
                <h2>Simple form</h2>
                <TextValidator
                    label="Email"
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <br />
                <TextValidator
                    label="Password"
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={submitted}
                >
                    {
                        (submitted && 'Your form is submitted!')
                        || (!submitted && 'Submit')
                    }
                </Button>
            </ValidatorForm>
        );

}

export default SimpleFormExample;