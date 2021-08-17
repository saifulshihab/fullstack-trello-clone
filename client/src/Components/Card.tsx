/* eslint-disable react/self-closing-comp */
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { BiCreditCard, BiLabel } from 'react-icons/bi';
import { BsCardImage } from 'react-icons/bs';
import { GrAttachment } from 'react-icons/gr';
import { ImParagraphLeft } from 'react-icons/im';
import { IoCloseOutline, IoPersonOutline } from 'react-icons/io5';
import { MdDateRange } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { VscChecklist } from 'react-icons/vsc';
import {
  CardsDocument,
  CardsQuery,
  CardInputType,
  useDeleteCardMutation,
  useEditCardMutation,
} from '../generated/graphql';
import { CardStatusType, DndTypes } from '../types';
import Loader from './Loader';
import ReactModal from './ReactModal';

interface CardProps {
  item: CardInputType;
  cardStatus: CardStatusType;
}

const initialState: CardInputType = {
  _id: '',
  title: '',
  description: '',
  status: '',
  board: '',
};

type ACTIONTYPE =
  | { type: 'setTitle'; value: string }
  | { type: 'setDescription'; value: string }
  | { type: 'setItemInput'; value: CardInputType };

const inputReducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'setTitle':
      return { ...state, title: action.value };
    case 'setDescription':
      return { ...state, description: action.value };
    case 'setItemInput':
      return action.value;
    default:
      return state;
  }
};

const Card = ({ item, cardStatus }: CardProps) => {
  const descFieldRef = useRef<HTMLTextAreaElement>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [descEdit, setDescEdit] = useState(false);
  const [itemInput, dispatch] = useReducer(inputReducer, initialState);

  const [deleteCard, { loading: deleteCardLoading }] = useDeleteCardMutation();
  const [editCard] = useEditCardMutation();

  useEffect(() => {
    dispatch({ type: 'setItemInput', value: item });
  }, [item]);

  useEffect(() => {
    if (descEdit) {
      descFieldRef.current?.focus();
    }
  }, [descEdit]);

  // dnd hooks
  const [{ isDragging }, dragRef] = useDrag(
    {
      type: DndTypes.CARD,
      item: { id: item._id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    },
    []
  );

  const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  const input = {
    _id: itemInput._id,
    title: itemInput.title,
    description: itemInput.description,
    status: itemInput.status,
    board: itemInput.board,
  };

  const titleChangedAndSave = async () => {
    await editCard({ variables: { cardInput: input } });
  };

  const descChangedAndSave = async () => {
    await editCard({ variables: { cardInput: input } });
  };

  const deleteCardHandler = async () => {
    const response = await deleteCard({
      variables: { cardId: item._id },
      update: (cache, { data: upcomingData }) => {
        const readData = cache.readQuery<CardsQuery>({
          query: CardsDocument,
          variables: { board: item.board },
        });

        const slicedData = readData?.cards.filter(
          (d) => d._id !== upcomingData?.deleteCard.card?._id
        );

        cache.writeQuery({
          query: CardsDocument,
          data: {
            cards: slicedData,
          },
          variables: { board: item.board },
        });
      },
    });
    if (!response.errors) {
      setModalOpen(false);
    }
  };

  return (
    <div
      ref={dragRef}
      className={`w-full bg-white h-12 flex-shrink-0 px-3 text-sm rounded shadow cursor-pointer ${
        isDragging ? 'hidden' : 'block'
      }`}
      onClick={() => setModalOpen(true)}
      role="presentation"
    >
      <div className="flex py-1 items-center space-x-2">
        <div
          className={`w-8 h-1 rounded-full ${
            cardStatus === 'todo'
              ? 'bg-blue-600'
              : cardStatus === 'doing'
              ? 'bg-yellow-400'
              : cardStatus === 'done' && 'bg-green-600'
          }`}
        >
          {' '}
        </div>
      </div>
      <p className="w-full truncate">{item?.title}</p>
      <ReactModal modalOpen={modalOpen} closeModal={closeModal}>
        <div className="w-full p-2 text-gray-700">
          <div className="w-full flex items-center space-x-4">
            <div className="flex-1 flex items-center space-x-3 text-xl">
              <div>
                <BiCreditCard />
              </div>
              <input
                type="text"
                value={itemInput?.title}
                onChange={(e) =>
                  dispatch({ type: 'setTitle', value: e.target.value })
                }
                onBlur={titleChangedAndSave}
                className="w-full bg-transparent font-bold focus:outline-none focus:bg-white rounded px-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={deleteCardHandler}
                type="button"
                className="w-8 h-8 flex text-sm items-center justify-center bg-red-300 font-bold hover:bg-red-400 rounded-full cursor-pointer"
              >
                {deleteCardLoading ? <Loader /> : <RiDeleteBin6Line />}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 font-bold text-xl hover:bg-gray-300 rounded-full cursor-pointer"
              >
                <IoCloseOutline />
              </button>
            </div>
          </div>
          <div className="w-full flex space-x-3 mt-3">
            <div className="flex-1 ">
              <div className="w-full flex items-center space-x-3 text-lg">
                <div>
                  <ImParagraphLeft />
                </div>
                <p className="bg-transparent text-sm font-semibold outline-none focus:bg-white rounded px-2 focus:ring-2 focus:ring-blue-500">
                  Description
                </p>
                {itemInput?.description !== '' ? (
                  <button
                    onClick={() => setDescEdit(true)}
                    type="button"
                    className="h-8 px-2 bg-gray-200 hover:bg-gray-300 text-sm rounded"
                  >
                    Edit
                  </button>
                ) : null}
              </div>
              <div className="w-full mt-3 pl-10">
                <textarea
                  ref={descFieldRef}
                  id="description"
                  name="description"
                  className="w-full bg-gray-200 focus:bg-white rounded p-1 px-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  defaultValue={
                    itemInput?.description ? itemInput?.description : ''
                  }
                  onClick={() => setDescEdit(true)}
                  onChange={(e) =>
                    dispatch({ type: 'setDescription', value: e.target.value })
                  }
                ></textarea>
                {descEdit && (
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      type="button"
                      className="w-12 h-8 rounded flex text-sm text-white items-center justify-center font-semibold bg-blue-500 hover:bg-blue-600 shadow"
                      onClick={() => {
                        descChangedAndSave();
                        setDescEdit(false);
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setDescEdit(false)}
                      type="button"
                      className="w-8 h-8 rounded flex items-center text-2xl justify-center font-bold hover:text-gray-800"
                    >
                      <IoCloseOutline />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-44">
              <p className="text-sm uppercase mb-3">ADD TO CARD</p>
              <div className="w-ful flex flex-col space-y-2 text-sm">
                <button
                  type="button"
                  className="h-8 rounded bg-gray-200 flex items-center space-x-2 px-2 hover:bg-gray-300"
                >
                  <IoPersonOutline />
                  <span>Members</span>
                </button>
                <button
                  type="button"
                  className="h-8 rounded bg-gray-200 flex items-center space-x-2 px-2 hover:bg-gray-300"
                >
                  <BiLabel />
                  <span>Labels</span>
                </button>
                <button
                  type="button"
                  className="h-8 rounded bg-gray-200 flex items-center space-x-2 px-2 hover:bg-gray-300"
                >
                  <VscChecklist />
                  <span>Checklist</span>
                </button>
                <button
                  type="button"
                  className="h-8 rounded bg-gray-200 flex items-center space-x-2 px-2 hover:bg-gray-300"
                >
                  <MdDateRange />
                  <span>Date</span>
                </button>
                <button
                  type="button"
                  className="h-8 rounded bg-gray-200 flex items-center space-x-2 px-2 hover:bg-gray-300"
                >
                  <GrAttachment />
                  <span>Attachments</span>
                </button>
                <button
                  type="button"
                  className="h-8 rounded bg-gray-200 flex items-center space-x-2 px-2 hover:bg-gray-300"
                >
                  <BsCardImage />
                  <span>Cover</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default Card;
