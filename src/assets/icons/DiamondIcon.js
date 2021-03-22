import React from "react";
import styled from "styled-components";

const DiamondIconWrapper = styled.svg`
  width: 16px;
  height: 16px;
  display:flex;
  justify-content:center;
  align-items:center;
  fill:currentColor;
`;

export const DiamondIcon = () => (
  <DiamondIconWrapper aria-hidden="true">
    <path d="M11.7969196,4 C11.9059735,4.00374246 11.9674492,4.02390044 12.0160295,4.04750775 L12.0505888,4.06565738 C12.0919394,4.08854618 12.1328843,4.11480004 12.1807768,4.17336769 L12.2430447,4.26381369 C12.3294848,4.41073638 12.8913453,5.36573389 13.9286263,7.12880621 C14.0464845,7.32913046 14.0183798,7.52251971 13.8443121,7.70897395 L8.54237725,12.7291621 C8.50389053,12.7645248 8.47651091,12.7892726 8.46023838,12.8034055 C8.16733279,13.0577974 7.90320994,13.0731532 7.5536862,12.8034055 L7.24033163,12.5262877 C6.56258337,11.9057791 4.86975003,10.3000079 2.16183161,7.70897395 C2.00232312,7.55752622 1.96072867,7.39053162 2.03704826,7.20799013 L2.07697588,7.12880621 L3.77434471,4.24377877 C3.83415963,4.1490438 3.88188112,4.10970543 3.92965655,4.08147027 L3.96568803,4.06168366 C4.0110214,4.03792372 4.05455562,4.01270214 4.13798175,4.00356391 L4.20868251,4 L11.7969196,4 Z M9.37003045,7.84670325 L6.63611331,7.84670325 L8.00307188,11.2322687 L9.37003045,7.84670325 Z M12.2735087,7.85315982 L10.4256015,7.85315982 L9.30700644,10.6493919 L12.2735087,7.85315982 Z M5.56974172,7.85315982 L3.73263504,7.85315982 L6.69750383,10.6493919 L5.56974172,7.85315982 Z M8.00280108,5.31932 L6.86489278,6.88502744 L9.14070937,6.88502744 L8.00280108,5.31932 Z M4.20868251,5.45614347 L3.36801699,6.88502744 L5.04934804,6.88502744 L4.20868251,5.45614347 Z M11.7969196,5.45614347 L10.9562541,6.88502744 L12.6375852,6.88502744 L11.7969196,5.45614347 Z M7.04570407,4.96167581 L5.06829876,4.96167581 L5.95046536,6.47033996 L7.04570407,4.96167581 Z M10.9402099,4.96167581 L8.96200003,4.96167581 L10.0575069,6.46639559 L10.9402099,4.96167581 Z" id="Fill"></path>
  </DiamondIconWrapper>
);