/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: haowenbin
 * @Date: 2022-11-02 09:50:59
 * @LastEditors: haowenbin
 * @LastEditTime: 2022-11-02 11:35:21
 * @FilePath: \testproject\src\App.test.tsx
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
