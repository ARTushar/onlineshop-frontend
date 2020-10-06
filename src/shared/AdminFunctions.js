import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportTableToPDF = (columnHeaders, dataTable) => {
	const unit = 'pt';
	const size = 'A4'; // Use A1, A2, A3 or A4
	const orientation = 'portrait'; // portrait or landscape

	const marginLeft = 40;
	const doc = new jsPDF(orientation, unit, size);

	doc.setFontSize(15);

	const title = 'My Awesome Report';

	const headers = [[]];
	columnHeaders.map((h) => headers[0].push(h.Header));
	const accessors = columnHeaders.map((h) => h.accessor);

	console.log(headers);

	const data = dataTable.map((order) => {
		let d = [];
		accessors.map((key) => {
			d.push(order[key]);
		});
		return d;
	});

	let content = {
		startY: 50,
		head: headers,
		body: data,
	};

	doc.text(title, marginLeft, 40);
	doc.autoTable(content);
	doc.save('report.pdf');
};
