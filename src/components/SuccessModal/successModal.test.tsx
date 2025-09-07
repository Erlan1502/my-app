import React from 'react';
import { render, screen } from '@testing-library/react';
import SuccessModal from './SuccessModal';

describe('SuccessModal Component', () => {
  it('Должно выдать сообщение с успешным засчитыванием прогресса', () => {
    render(<SuccessModal />);
    const messageElement = screen.getByText('Ваш прогресс засчитан!');
    expect(messageElement).toBeInTheDocument();
  });

  it('Должно рендерить свг', () => {
    render(<SuccessModal />);
    const svgUseElement = document.querySelector('svg use');
    expect(svgUseElement).toHaveAttribute(
      'href',
      '/img/icon/Big-Check-in-Circle.svg'
    );
  });
});
