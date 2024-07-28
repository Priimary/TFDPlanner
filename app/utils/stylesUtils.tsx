// Function to get the color of the element
export const getElementTextColor = (element: string) => {
	switch (element) {
		case 'Electric': return '#DA70D6';
		case 'Fire': return 'red';
		case 'Chill': return 'lightblue';
		case 'Toxic': return '#32CD32';
		default: return 'white';
	}
};