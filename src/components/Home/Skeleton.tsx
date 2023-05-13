import * as React from "react";
import { IAnime } from "../../types";

interface ISkeletonProps {
  anime: IAnime;
}

const Skeleton: React.FunctionComponent<ISkeletonProps> = (props) => {
  return (
    <div className="skeleton__block">
      <div className="skeleton">
        <div className="skeleton__img"></div>
        <div className="skeleton__title"></div>
        <ul className="skeleton__categories">
          <li className="skeleton__categories--category">
            <span></span>
          </li>
          <li className="skeleton__categories--category">
            <span></span>
          </li>
          <li className="skeleton__categories--category">
            <span></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Skeleton;
