import { styled } from "styled-components";

export const Token = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
`;

export const TokenHeader = styled.div`
  padding: 20px;
  background: #16156a;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

export const TokenResultFlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const TokenHeaderTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #ffdc85;
`;

export const TokenResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #3e2acf;
  background: #f2f2fd;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 20px;
`;

export const TokenResultBalanceText = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #16156a;
`;

export const TokenTransferInputText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #16156a;
  margin-top: 20px;
  margin-bottom: 8px;
  text-align: left;
  width: 100%;
`;

export const TokenTransferInput = styled.input`
  outline-width: 0;
  border-radius: 4px;
  border: 1px solid #3e2acf;
  padding: 8px;
  width: 100%;
`;

export const TokenButton = styled.button`
  outline-width: 0;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 600;
  color: #ffdc85;
  background: #3e2acf;
  border: none;
  padding: 12px;
  font-size: 16px;
  width: 100%;
  max-width: 235px;
  cursor: pointer;
  margin-top: 30px;

  &:disabled {
    cursor: auto;
    opacity: 0.5;
  }

  &.cancel {
    margin-right: 16px;
  }
`;
