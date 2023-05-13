import * as React from "react";
import { IAnime } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { removeBookmark } from "../../store/features/bookmarks.reducer";
import { useNavigate } from "react-router-dom";

interface IBookmarkProps {
  anime: IAnime;
}

const Bookmark: React.FunctionComponent<IBookmarkProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return (
    <div className="anime__block">
      <div className="anime">
        <figure className="anime__img">
          <img
            src={props.anime.images.jpg.large_image_url}
            onClick={() => navigate(`/anime/${props.anime.mal_id}`)}
          />
          <div className="anime__buttons">
            <button
              className="anime__buttons--button"
              onClick={() => dispatch(removeBookmark(props.anime.mal_id))}
            >
              <FontAwesomeIcon icon={faTrashCan} className="icon" />
              <p>Remove</p>
            </button>
          </div>
        </figure>
        <div className="anime__title">
          <p>{props.anime.title}</p>
        </div>
        <div className="anime__info">
          <span>
            {props.anime.season} · {props.anime.status}
          </span>
        </div>
        <ul className="anime__categories">
          {props.anime.genres.map((genre) => (
            <li className="anime__categories--category" key={genre.mal_id}>
              <span>{genre.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Bookmark;
