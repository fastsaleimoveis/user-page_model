'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import styled from 'styled-components';

interface CarouselProps {
  children: ReactNode | ReactNode[];
  slidesPerView?: number | { mobile: number; desktop: number };
  spaceBetween?: number;
  navigation?: boolean;
  pagination?: boolean;
  loop?: boolean;
  centeredSlides?: boolean;
  className?: string;
  showIndicators?: boolean;
  indicatorColor?: string;
  indicatorActiveColor?: string;
  controlColor?: string;
  paginationType?: 'dots' | 'numbers';
}

export function Carousel({
  children,
  slidesPerView = 1,
  spaceBetween = 10,
  navigation = true,
  pagination = true,
  loop = false,
  centeredSlides = false,
  className = '',
  showIndicators = true,
  indicatorColor = '#ccc',
  indicatorActiveColor = '#333',
  controlColor = '#333',
  paginationType = 'numbers',
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  // Determinar slides por view
  const getSlidesPerView = () => {
    if (typeof slidesPerView === 'object') {
      return isMobile ? slidesPerView.mobile : slidesPerView.desktop;
    }
    return slidesPerView;
  };

  const slidesToShow = getSlidesPerView();
  const childrenArray = Array.isArray(children) ? children : [children];
  const totalSlides = childrenArray.length;
  const maxIndex = loop ? totalSlides : Math.max(0, totalSlides - slidesToShow);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Atualizar índice quando slidesPerView mudar
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [slidesToShow, maxIndex]);

  const goToSlide = (index: number) => {
    if (loop) {
      setCurrentIndex(index);
    } else {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    }
  };

  const nextSlide = () => {
    if (loop) {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  };

  const prevSlide = () => {
    if (loop) {
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const getTransform = () => {
    if (centeredSlides && slidesToShow === 1) {
      return `translateX(calc(-${currentIndex * 100}% - ${currentIndex * spaceBetween}px))`;
    }
    const slideWidth = `calc((100% - ${(slidesToShow - 1) * spaceBetween}px) / ${slidesToShow})`;
    return `translateX(calc(-${currentIndex} * (${slideWidth} + ${spaceBetween}px)))`;
  };

  return (
    <CarouselContainer className={className}>
      <CarouselWrapper ref={carouselRef}>
        <CarouselTrack
          ref={slideRef}
          style={{
            transform: getTransform(),
            transition: 'transform 0.3s ease-in-out',
          }}
          spaceBetween={spaceBetween}
          slidesPerView={slidesToShow}
          centeredSlides={centeredSlides}
        >
          {childrenArray.map((child, index) => (
            <CarouselSlide
              key={index}
              spaceBetween={spaceBetween}
              slidesPerView={slidesToShow}
              centeredSlides={centeredSlides}
            >
              {child}
            </CarouselSlide>
          ))}
        </CarouselTrack>
      </CarouselWrapper>

      {navigation && totalSlides > slidesToShow && (
        <>
          <NavButton
            type="button"
            onClick={prevSlide}
            position="left"
            controlColor={controlColor}
            aria-label="Slide anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </NavButton>
          <NavButton
            type="button"
            onClick={nextSlide}
            position="right"
            controlColor={controlColor}
            aria-label="Próximo slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </NavButton>
        </>
      )}

      {pagination && totalSlides > slidesToShow && (
        <PaginationContainer>
          {paginationType === 'dots' && showIndicators ? (
            Array.from({ length: loop ? totalSlides : maxIndex + 1 }).map((_, index) => {
              return (
                <PaginationDot
                  key={index}
                  active={index === currentIndex}
                  onClick={() => goToSlide(index)}
                  indicatorColor={indicatorColor}
                  indicatorActiveColor={indicatorActiveColor}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              );
            })
          ) : (
            <PaginationText
              indicatorColor={indicatorActiveColor}
            >
              {currentIndex + 1}/{totalSlides}
            </PaginationText>
          )}
        </PaginationContainer>
      )}
    </CarouselContainer>
  );
}

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const CarouselTrack = styled.div<{
  spaceBetween: number;
  slidesPerView: number;
  centeredSlides: boolean;
}>`
  display: flex;
  width: ${(p) => p.centeredSlides && p.slidesPerView === 1 ? '100%' : '100%'};
  gap: ${(p) => p.spaceBetween}px;
`;

const CarouselSlide = styled.div<{
  spaceBetween: number;
  slidesPerView: number;
  centeredSlides: boolean;
}>`
  flex: 0 0 ${(p) => p.centeredSlides && p.slidesPerView === 1 
    ? '100%' 
    : `calc((100% - ${(p.slidesPerView - 1) * p.spaceBetween}px) / ${p.slidesPerView})`};
  min-width: 0;
`;

const NavButton = styled.button<{
  position: 'left' | 'right';
  controlColor: string;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(p) => p.position}: 10px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid ${(p) => p.controlColor};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${(p) => p.controlColor};

  &:hover {
    background: ${(p) => p.controlColor};
    color: white;
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    ${(p) => p.position}: 5px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 15px;
  padding: 10px 20px;
`;

const PaginationDot = styled.button<{
  active: boolean;
  indicatorColor: string;
  indicatorActiveColor: string;
}>`
  width: ${(p) => (p.active ? '24px' : '8px')};
  height: 8px;
  border-radius: 4px;
  border: none;
  background-color: ${(p) => (p.active ? p.indicatorActiveColor : p.indicatorColor)};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background-color: ${(p) => p.indicatorActiveColor};
    width: 16px;
  }
`;

const PaginationText = styled.span<{
  indicatorColor: string;
}>`
  font-size: 14px;
  font-weight: 500;
  color: ${(p) => p.indicatorColor};
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  border: 1px solid ${(p) => p.indicatorColor};
  display: inline-block;
`;

