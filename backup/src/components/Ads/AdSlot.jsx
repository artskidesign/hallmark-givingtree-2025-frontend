import React from "react";

const AdSlot = ({ slotId, height, width, classNames }) => (
  <div className={classNames}>
    <span id={slotId} className="_fwph">
      <form id={`_fw_form_${slotId}`} style={{ display: "none" }}>
        <input
          type="hidden"
          name={`_fw_input_${slotId}`}
          id={`_fw_input_${slotId}`}
          value={`slid=${slotId}&slau=banner&tpcl=DISPLAY&ptgt=s&h=${height}&w=${width}`}
        />
      </form>
      <span id={`_fw_container_${slotId}`} className="_fwac" />
    </span>
  </div>
);

export default AdSlot;
