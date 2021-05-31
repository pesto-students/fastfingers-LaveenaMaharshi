const mapRange = (value, fromRange=[0,1], toRange=[0,100])=>{
  return toRange[0] + (((value - fromRange[0])/(fromRange[1] - fromRange[0])) * (toRange[1] - toRange[0]))
}

export default mapRange;