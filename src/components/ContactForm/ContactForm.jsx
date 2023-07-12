import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import css from './ContactForm.module.css';
const { contact_form, label, submit_button, input } = css;

const inputNameId = nanoid();
const inputNumberId = nanoid();

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = ({ target }) => {
    switch (target.name) {
      case 'name':
        setName(target.value);
        break;
      case 'number':
        setNumber(target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmitForm = event => {
    event.preventDefault();

    addContact({ id: nanoid(), name, number });

    handleResetForm('');
  };

  const handleResetForm = value => {
    setName(value);
    setNumber(value);
  };

  return (
    <form className={contact_form} onSubmit={handleSubmitForm}>
      <label htmlFor="name" className={label} id={inputNameId}>
        Name:
      </label>
      <input
        id={inputNameId}
        type="text"
        name="name"
        className={input}
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        value={name}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="phone" className={label} id={inputNumberId}>
        Phone Number:
      </label>
      <input
        type="tel"
        id={inputNumberId}
        name="number"
        className={input}
        pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        value={number}
        onChange={handleInputChange}
        required
      />

      <button type="submit" className={submit_button}>
        Submit
      </button>
    </form>
  );
};

// class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   inputNameId = nanoid();
//   inputNumberId = nanoid();

//   handleInputChange = ({ target }) => {
//     this.setState({ [target.name]: target.value });
//   };

//   handleSubmitForm = event => {
//     event.preventDefault();

//     this.props.addContact({ id: nanoid(), ...this.state });

//     this.handleResetForm();
//   };

//   handleResetForm = () => {
//     this.setState({ name: '', number: '' });
//   };

//   render() {
//     const { name, number } = this.state;
//     return (
//       <form className={contact_form} onSubmit={this.handleSubmitForm}>
//         <label htmlFor="name" className={label} id={this.inputNameId}>
//           Name:
//         </label>
//         <input
//           id={this.inputNameId}
//           type="text"
//           name="name"
//           className={input}
//           pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//           title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//           value={name}
//           onChange={this.handleInputChange}
//           required
//         />

//         <label htmlFor="phone" className={label} id={this.inputNumberId}>
//           Phone Number:
//         </label>
//         <input
//           type="tel"
//           id={this.inputNumberId}
//           name="number"
//           className={input}
//           pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
//           title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//           value={number}
//           onChange={this.handleInputChange}
//           required
//         />

//         <button type="submit" className={submit_button}>
//           Submit
//         </button>
//       </form>
//     );
//   }
// }

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
