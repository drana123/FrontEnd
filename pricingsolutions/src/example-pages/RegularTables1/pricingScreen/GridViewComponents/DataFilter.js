import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { InputNumber, InputGroup } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import React, { useEffect, useState } from 'react';

function DataFilter(props) {
    
    const [sliderValue , setSliderValue] = useState(props.initValue);
    const [MaxValue , setMaxValue] = useState(props.MaxValue);
    useEffect(()=>{
        setSliderValue(props.initValue);
        setMaxValue(props.MaxValue);
    },[props]);
return (
    <div>
        <Typography id="range-slider" gutterBottom>
            {props.Filtertext}
        </Typography>
        <Slider
            data-testid = {"SliderId"}
            min={MaxValue[0]}
            max={MaxValue[1]}
            value={sliderValue}
            onChange={(event, newRange) => {
                setSliderValue(newRange);
                props.callbackFunc(newRange);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
        />
        <InputGroup  data-testid = {"InputGroupId"}>
            <InputNumber
                data-testid = {"lowId"}
                min={MaxValue[0]}
                max={MaxValue[1]}
                value={sliderValue[0]}
                onChange={(lowerLimit) => {
                const newRange = [lowerLimit,sliderValue[1]];
                props.callbackFunc(newRange);
                setSliderValue(newRange);
              }}
            />
        <InputGroup.Addon>to</InputGroup.Addon>
        <InputNumber
            data-testid = {"highId"}
            min={MaxValue[0]}
            max={MaxValue[1]}
            value={sliderValue[1]}
            onChange={(upperLimit) => {
            const newRange = [sliderValue[0],upperLimit];
            props.callbackFunc(newRange);
            setSliderValue(newRange);
            }}
            />
        </InputGroup>
    </div>
    );
}


export default DataFilter;