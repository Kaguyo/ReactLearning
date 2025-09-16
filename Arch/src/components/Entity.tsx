import { useEntity } from "../hooks/useEntity";
import { usePosition } from "../hooks/usePosition";

function Entity() {
    let position = usePosition();
    const entity = useEntity({ joints: 7, position: position });

    return (
    entity
  )
}
export default Entity