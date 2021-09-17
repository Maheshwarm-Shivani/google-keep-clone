import React, { useContext, useState } from 'react';

// Styled Components
import { CirclePicker } from 'react-color';

// Icons
import { RiPushpin2Fill, RiPushpin2Line } from 'react-icons/ri';
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { AiOutlinePlusSquare } from 'react-icons/ai';

// Unique uid generator
import { v4 as uuidv4 } from 'uuid';

// Context
import { NoteActionContext } from '../../context/NoteContext';

const NoteForm = () => {
  // Calling Context
  const { addNote } = useContext(NoteActionContext);

  // Creating Context
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [pin, setPin] = useState(false);
  const [archive, setArchive] = useState(false);
  const [color, setColor] = useState('#fff');
  const [showPicker, setShowPicker] = useState(false);

  // Add Note Function
  const Submit = () => {
    let newArray = [];
    let id = uuidv4();
    if (note !== '') {
      var noteArray = note.split(/^/gm);
      noteArray.forEach((data) => {
        let obj = {
          id: uuidv4(),
          subnote: data,
          check: false,
        };
        newArray.push(obj);
      });
    }
    let obj = {
      id: id,
      title: title,
      note: newArray,
      pin: pin,
      archieve: archive,
      bgColor: color,
    };
    addNote(obj);
    setNote('');
    setTitle('');
    setPin(false);
    setArchive(false);
    setColor('#fff');
  };

  return (
    <div className='note-form' style={{ background: color }}>
      <input
        style={{ background: color }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Title'
      />
      <textarea
        style={{ background: color }}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder='Take a note'
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='icons-container'>
          <div onClick={() => setPin(!pin)}>
            {pin ? (
              <RiPushpin2Fill className='note-icon' />
            ) : (
              <RiPushpin2Line className='note-icon' />
            )}
          </div>

          <div onClick={() => setArchive(!archive)}>
            {archive ? (
              <BiArchiveOut className='note-icon' />
            ) : (
              <BiArchiveIn className='note-icon' />
            )}
          </div>
          <div>
            <AiOutlinePlusSquare className='note-icon' />
          </div>
          <div>
            <IoColorPaletteOutline
              onClick={() => setShowPicker(!showPicker)}
              className='note-icon'
            />

            <div className={showPicker ? 'show' : 'hide'}>
              <CirclePicker
                color={color}
                onChangeComplete={(color, event) => setColor(color.hex)}
                width={220}
                height={100}
              />
            </div>
          </div>
        </div>

        <button className='submit' onClick={Submit}>
          Add Note
        </button>
      </div>
    </div>
  );
};

export default NoteForm;
