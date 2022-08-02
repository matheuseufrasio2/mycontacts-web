import {
  useEffect, useState, useImperativeHandle, forwardRef,
} from 'react';
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
import { Button } from '../Button';

import { FormGroup } from '../FormGroup';
import { useSafeAsyncState } from '../../hooks/useSafeAsyncState';

export const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone) ?? '');
      setCategoryId(contact.categoryId ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

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
      } catch { } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, [setCategories, setIsLoadingCategories]);

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

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    const data = {
      name,
      email,
      phone: phone.replace(/\D/g, ''),
      categoryId,
    };

    await onSubmit(data);

    setIsSubmitting(false);
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          value={name}
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          value={email}
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          type="email"
          onChange={handleEmailChange}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup>
        <Input
          value={phone}
          placeholder="Telefone"
          onChange={handlePhoneChange}
          maxLength="15"
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
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
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>

      </ButtonContainer>
    </Form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
