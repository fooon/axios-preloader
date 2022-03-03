import React, { useEffect, useState } from 'react';
import cx from 'classnames'

import './index.scss'

let delay = 10
const cssDelay = 400

const Animation = ({
  end,
  position,
  style = {},

  onEnd
}) => {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    let timeout;

    if(percent > 40) delay = 25;

    if(percent < 85){
      timeout = setTimeout(() => {
        setPercent((prev) => end ? 100 : prev + 0.1)
      }, percent == 0 ? 10 : delay)
    }

    return () => {
      percent < 85 && clearTimeout(timeout)
    }
  })

  useEffect(() => {
    end && setTimeout(() => onEnd(), delay + cssDelay);
  }, [end])

  return (
    <div
      className={cx(
        "rc-progress-bar",
        position == 'top' ? 'preloader-top' : 'preloader-bottom'
      )}
      style={style}
    >
      <div
        style={{ width: percent + '%', backgroundColor: "#64B904", height: 3 }}
        className="preloader"
      />
    </div>
  )
}

const Preloader = ({
  start,
  position,
  style
}) => {
  const [loaderStatus, setLoaderStatus] = useState(false)

  const onEndAfterDelay = () => {
    setLoaderStatus(false)
  }

  useEffect(() => {
    start && setLoaderStatus(true)
  }, [start])

  useEffect(() => {
    return () => setLoaderStatus(false)
  }, [])

  if(!loaderStatus){
    return null;
  }

  return (
    <Animation
      end={loaderStatus && !start}
      onEnd={onEndAfterDelay}
      position={position}
      style={style}
    />
  )
}

export default Preloader;