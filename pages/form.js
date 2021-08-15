import React, { Component } from 'react';
import { Form, Input, Button, Segment, Message} from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class PatientForm extends Component {
    state = {
        ic: '',
        name: '',
        phone: '',
        gender: '',
        dob: '',
        bloodgroup: '',
        allergies: '',
        loading: false,
        errorMessage: ''
    };

    onSubmit = async event => {
        event.preventDefault();

        const { ic, name, phone, gender, dob, bloodgroup, allergies } = this.state;

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            await record.methods.setDetails(
                ic, name, phone, gender, dob, bloodgroup, allergies
            ).send({ from: accounts[0] });

            alert("Account created successfully!");
            Router.pushRoute('/list');
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
            alert("Account already exists");
        }

        this.setState({ loading: false, ic: '', name: '', phone: '', gender: '', dob: '', bloodgroup: '', allergies: ''});
    }

    render() {
        return (
            <Layout>
                <Segment>
                <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Personal Health Record</h2>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>IC</label>
                            <Input
                                placeholder = 'Eg. 001234010234'                
                                value= {this.state.ic}
                                onChange= {event => 
                                    this.setState({ ic: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Full Name</label>
                            <Input
                                placeholder = 'Eg. John Smith'                        
                                value= {this.state.name}
                                onChange= {event => 
                                    this.setState({ name: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Phone</label>
                            <Input
                                placeholder = 'Eg. 0123456789'
                                value= {this.state.phone}
                                onChange= {event => 
                                    this.setState({ phone: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>
                    <br/>              
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Gender</label>
                            <Input 
                                placeholder = 'Eg. Male'
                                value= {this.state.gender}
                                onChange= {event => 
                                    this.setState({ gender: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Date of Birth</label>
                            <Input 
                                placeholder = 'Eg. 01/01/1997'
                                value= {this.state.dob}
                                onChange= {event => 
                                    this.setState({ dob: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>                   
                    <br/>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Blood Group</label>
                            <Input 
                                placeholder = 'Eg. A-'
                                value= {this.state.bloodgroup}
                                onChange= {event => 
                                    this.setState({ bloodgroup: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Allergies</label>
                            <Input 
                                placeholder = 'Eg. Peanut Allergy Pollen Allergy'
                                value= {this.state.allergies}
                                onChange= {event => 
                                    this.setState({ allergies: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>
                    <br/>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>
                </Segment>
            </Layout>
        );
    }
}

export default PatientForm;