import React, { ReactNode } from "react";
import * as S from "./styles";

interface IApplicationView {
  children: ReactNode;
}

const ApplicationView = ({ children }: IApplicationView) => {
  return <S.ApplicationView>{children}</S.ApplicationView>;
};

export default ApplicationView;
