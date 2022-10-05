function PulsatingCircle({ color }: any) {
  return (
    <div style={{ paddingTop: "3px", paddingLeft: "3px" }}>
      {" "}
      <svg
        width="20"
        height="20"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="20"
          cy="20"
          fill={color}
          r="10"
          stroke={color}
          strokeWidth="2"
        >
          <animate
            attributeName="r"
            from="8"
            to="20"
            dur="1.5s"
            begin="0s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1.5s"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="20" cy="20" fill={color} r="10" />
      </svg>
    </div>
  );
}

export default PulsatingCircle;
