export default function doorsPlugin(k) {
	return {
		closeDoors() {
			const leftDoor = add([
				sprite("door"),
				stay(),
				pos(-1, 0),
				z(100),
				k.anchor("topright"),
				"door2",
			]);

			const rightDoor = add([
				sprite("door"),
				stay(),
				pos(65, 0),
				z(100),
				"door2",
			]);

			const finishClose = onUpdate(() => {
				leftDoor.moveTo(32, 0, 50);
				rightDoor.moveTo(32, 0, 50);
			});
  		}
	}
};