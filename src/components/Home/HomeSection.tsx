import * as React from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePage } from "../../store/features/animeList.reducer";

interface IHomeSectionProps {
  checkedOption: string;
}

const HomeSection: React.FunctionComponent<IHomeSectionProps> = (props) => {
  const navigate = useNavigate();
  const options = useSelector(
    (state: RootState) => state.optionsReducer.options
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="section section__wrapper">
      <ul className="section__options">
        {options.map((option) => (
          <li className="section__options--option" key={option.id}>
            <span
              className="section__options--option-text"
              style={{
                fontWeight:
                  option.name === props.checkedOption ? 700 : "normal",
              }}
              onClick={() => {
                dispatch(updatePage({ filterChanged: true }));
                navigate(`${option.link}`);
              }}
            >
              {option.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeSection;
