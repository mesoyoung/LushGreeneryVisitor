import React, { Component } from 'react';
import './form.css'

class Form extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fullName: '',
            contactInfo: '',
            contactType: 'telegram',
            email: '',
            feedback: '',

        }
    }

    handleFullNameChange = (event) => {
        this.setState({
            fullName: event.target.value
        })
    }

    handleContactInfoChange = (event) => {
        this.setState({
            contactInfo: event.target.value
        })
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleFeedbackChange = (event) => {
        this.setState({
            feedback: event.target.value
        })
    }

    handleContactTypeChange = (event) => {
        this.setState({
            contactType: event.target.value
        })
    }

    handleSubmit = event => {
        alert(`${this.state.fullName} ${this.state.contactInfo} ${this.state.contactType} ${this.state.email} ${this.state.feedback}`)
        event.preventDefault()
    }

    render() {
        const { fullName, contactInfo, contactType, email, feedback } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Full Name* </label>
                    <input
                        type='text'
                        value={fullName}
                        onChange={this.handleFullNameChange}
                    />
                </div>
                <div>
                    <label>Mobile No/Telegram ID*</label>
                    <input
                        type='text'
                        value={contactInfo}
                        onChange={this.handleContactInfoChange}
                    />
                </div>
                <div>
                    <label>Preferred Contact Type</label>
                    <select value={contactType} onChange={this.handleContactTypeChange}>
                        <option value='whatsapp'>Whatsapp</option>
                        <option value='telegram'>Telegram</option>
                    </select>
                </div>
                <div>
                    <label>Email*</label>
                    <input
                        type='text'
                        placeholder='(Meetup details will be sent to this email)'
                        value={email}
                        onChange={this.handleEmailChange}
                    />
                </div>
                <div>
                    <label>Feedback</label>
                    <textarea
                        value={feedback}
                        onChange={this.handleFeedbackChange}
                    />
                </div>

                <button type='submit'>Submit</button>
            </form>
        );
    };
};

export default Form;