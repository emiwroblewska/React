import React, {useState} from 'react';

function Form(props)
{
    const [active, setActive]= useState(false);
    const [age, setAge]= useState('');
    const [name, setName]= useState('');
    const [company, setCompany]= useState('');
    const [email, setEmail]= useState('');

    function checkboxChange(e) {
        const { checked } = e.target;
        console.log(checked);
        setActive(checked);
    }

    function handleSubmit(event) {
        props.setSaving(true);
        const data =  
        {
            isActive: active,
            age: age,
            name: name,
            company: company,
            email: email 
        }
        console.log(JSON.stringify(data));

        fetch('http://localhost:3004/employees', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .then(() => props.reloadData())
        
        event.preventDefault();
    }

    function cancelClick() {
        props.cancelFunction();
    }

    return (
        <div>
        <h5>Add new employee</h5>
        <form onSubmit={handleSubmit}>
            <label>ID: </label>
            <input type="text" value="(autogenerated)" disabled={true}/>
            <br/>

            <label>Is Active: </label>
            <input type="checkbox" onChange={(e) => checkboxChange(e)}/>
            <br/>

            <label>Age: </label>
            <input type="number" onChange={ev => setAge(ev.target.value)} required="required"/>
            <br/>

            <label>Full Name: </label>
            <input type="text" onChange={ev => setName(ev.target.value)} required="required"/>
            <br/>

            <label>Company: </label>
            <input type="text" onChange={ev => setCompany(ev.target.value)} required="required"/>
            <br/>

            <label>Email Address: </label>
            <input type="email" onChange={ev => setEmail(ev.target.value)} required="required"/>
            <br/><br/>

            <input type="submit" value="Save" className="buttons"></input>
            <button className="buttons" onClick={cancelClick}>Cancel</button>
        </form>
        </div>
    );
}

export default Form;