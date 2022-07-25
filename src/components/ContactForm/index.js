import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useErrors from '../../hooks/useErrors';
import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import { CategoriesService } from '../../services/CategoriesService';

import {
  Form,
  ButtonContainer,
} from './styles';

import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import { FormGroup } from '../FormGroup';

export function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const {
    setError,
    removeError,
    getErrorMessageByFieldName,
    errors,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useEffect(() => {
    setIsLoadingCategories(true);
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();

        setCategories(categoriesList);
      } catch {} finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({
        field: 'name',
        message: 'Nome é obrigatório',
      });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // const data = {
    //   name,
    //   email,
    //   phone: phone.replace(/\D/g, ''),
    //   category,
    // };
    // console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          value={name}
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          onChange={handleNameChange}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          value={email}
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          type="email"
          onChange={handleEmailChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          value={phone}
          placeholder="Telefone"
          onChange={handlePhoneChange}
          maxLength="15"
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories}
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
        >
          {buttonLabel}
        </Button>

      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
