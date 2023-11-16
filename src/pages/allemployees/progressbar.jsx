import React from 'react';
import styled from '@emotion/styled'

const CssWrapper = styled.div`
    .progress-bar {
    width: 100%;
    height: 20px;
    background-color: #f1f1f1;
    border-radius: 10px;
    overflow: hidden;
    }

    .progress-bar__fill {
    height: 100%;
    background-color: #42b983;
    transition: width 0.3s ease-in-out;
    }
`
const ProgressBar = ({ startDate, endDate }) => {
    const currentDate = new Date();
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    const totalTime = endTime - startTime;
    const elapsedTime = currentDate.getTime() - startTime;
    const progress = (elapsedTime / totalTime) * 100;

    return (
        <CssWrapper>
            <div className="progress-bar">
                <div
                    className="progress-bar__fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </CssWrapper>
    );
};

export default ProgressBar;
