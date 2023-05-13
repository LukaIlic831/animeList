import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { filter } from "../../data";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { updatePage } from "../../store/features/animeList.reducer";
import { AppContext } from "../../App";
import { IAppContext } from "../../types";

interface ISectionSubTitleProps {
  subTitle: string;
}

var changedFilter = filter;

const SectionSubTitle: React.FunctionComponent<ISectionSubTitleProps> = (
  props
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { setFilterChangedSkel, setFilterText, filterText } = React.useContext(
    AppContext
  ) as IAppContext;
  const [isFilterOpened, setIsFilterOpened] = React.useState<boolean>(false);
  const filterRef = React.useRef<HTMLUListElement | null>(null);

  const changeFilter = (name: string): void => {
    setFilterText(name);
    setFilterChangedSkel(true);
    dispatch(updatePage({ filterChanged: true }));
    changedFilter = filter.filter((item) => item.name !== name);
  };

  const removeFilter = () => {
    setFilterText("Filter by Type");
    changedFilter = filter;
    dispatch(updatePage({ filterChanged: true }));
  };

  React.useEffect(() => {
    window.addEventListener("mouseup", (event) => {
      if (!filterRef.current?.contains(event.target as Node)) {
        setIsFilterOpened(false);
      }
    });
  }, []);

  return (
    <div className="section__sub-title--wrapper">
      <h2>{props.subTitle}</h2>
      {props.subTitle === "Top Anime" && (
        <div
          className="filter"
          style={
            isFilterOpened
              ? { border: "2px solid #2563eb" }
              : { border: "2px solid white" }
          }
        >
          <div className="filter__text">
            <span>{filterText}</span>
          </div>
          <ul className="filter__options">
            {filterText !== "Filter by Type" && (
              <li
                className="filter__options--option"
                onClick={() => removeFilter()}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="filter__options--option-icon"
                />
              </li>
            )}
            <li className="filter__options--option">
              <FontAwesomeIcon
                style={{ paddingTop: 2 }}
                icon={faAngleDown}
                onClick={() => setIsFilterOpened(true)}
                className="filter__options--option-icon"
              />
            </li>
          </ul>
          {isFilterOpened && (
            <ul className="filter__names" ref={filterRef}>
              {changedFilter.map((item) => (
                <li
                  className="filter__names--name"
                  key={item.id}
                  onClick={() => changeFilter(item.name)}
                >
                  <p>{item.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionSubTitle;
