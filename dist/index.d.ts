import * as React from 'react';
import { Options } from './scriptLoader';
import './styles.scss';
export declare type RKakaoPostcodeProps = {
    className?: string;
    onChange: Function;
    scriptId: string;
    options: Options;
};
declare const ReactKakaoPostcode: React.FC<RKakaoPostcodeProps>;
export default ReactKakaoPostcode;
