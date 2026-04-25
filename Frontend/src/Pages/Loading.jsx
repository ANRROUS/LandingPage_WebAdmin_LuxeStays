import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animación de rotación
const rotar = keyframes`
    0% { transform: rotateY(0deg) rotateX(0deg); }
    50% { transform: rotateY(360deg) rotateX(360deg); }
    100% { transform: rotateY(0deg) rotateX(0deg); }
`;

// Styled-components
const Container = styled.div`
    margin: 20% auto 0;
    display: block;
    width: 600px;
    height: 200px;
`;

const Cubo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    height: 100px;
    transform-style: preserve-3d;
    animation: ${rotar} 3s linear infinite;
`;

const Span = styled.span`
    position: absolute;
    width: 4em;
    height: 4em;
    border: 4px solid black;
    border-radius: 4px;
    
    &:nth-child(1) {
        transform: rotateY(90deg) translateZ(2em);
    }

    &:nth-child(2) {
        transform: rotateY(90deg) translateZ(-2em);
    }

    &:nth-child(3) {
        transform: rotateY(90deg) translateZ(-2em);
    }

    &:nth-child(4) {
        transform: rotateY(90deg) translateZ(2em);
    }

    &:nth-child(5) {
        transform: translateZ(-2em);
    }

    &:nth-child(6) {
        transform: translateZ(2em);
    }
`;

const LoadingContainer = styled.div`
    height: 30px;
`;

const Heading = styled.h1`
    letter-spacing: 3px;
    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: black
`;

function Loading() {
    return (
        <Container>
            <Cubo>
                <Span></Span>
                <Span></Span>
                <Span></Span>
                <Span></Span>
                <Span></Span>
                <Span></Span>
            </Cubo>
            <LoadingContainer>
                <Heading>Loading ...</Heading>
            </LoadingContainer>
        </Container>
    );
}

export default Loading;
