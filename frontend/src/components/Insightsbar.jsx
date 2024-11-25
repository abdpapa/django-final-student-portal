import { Circle } from 'rc-progress'
import './Insightbar.css'


function Insightsbar(){
    return(
        <div className='insightbar'>
            <p className='insighttext' >Your Insights</p>
            <div className='insightboxes'>
                <div className='successrate'>
                    Success Rate
                    <Circle strokeWidth={5} strokeColor={"purple"} percent={40} trailColor='yellow' trailWidth={5}/>
                </div>
                <div className='overallperformance'>
                    Overall Performance
                    <Circle strokeWidth={5} strokeColor={"purple"} percent={40} trailColor='yellow' trailWidth={5}/>
                </div>
            </div>
        </div>
    );
};

export default Insightsbar