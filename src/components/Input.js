import styled, { css } from 'styled-components';

export default styled.input`
  width: 100%;
  border: 0;
  background: #fff;
  border: 2px solid #fff;
  height: 52px;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color 0.2s ease-in;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary.main}
  }

  ${({ error, theme }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}
`;
