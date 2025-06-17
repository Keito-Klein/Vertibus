const fs = require('fs');
const path = require('path');

class StoreDB {
	constructor(file = "store.json") {
		this.data = {}
		this.file = path.join(process.cwd(), 'db', file);
		this.isWriting = false;
		this.writePending = false;
	}
	
	read = async () => {
		let data;
		if (fs.existsSync(this.file)) {
			try {
				data = JSON.parse(fs.readFileSync(this.file))
			} catch(e) {
				if (fs.existsSync(this.file + '.bak')) {
					data = JSON.parse(fs.readFileSync(this.file + '.bak'))
					fs.writeFileSync(this.file, JSON.stringify(data, null, 2))
				} else {
					data = this.data
					fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2))
				}
			}
		} else {
			data = this.data
			fs.mkdirSync(path.dirname(this.file), { recursive: true })
			fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2))
		}
		return data
	}
	
	write = async (data) => {
		this.data = data || global.db || {}
		if (this.isWriting) {
			this.writePending = true;
			return;
		}
		this.isWriting = true;
		try {
			let dirname = path.dirname(this.file)
			if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true })
			if (fs.existsSync(this.file)) fs.copyFileSync(this.file, this.file + '.bak')
			if (Object.keys(this.data).length > 0) fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2))
		} catch (e) {
			console.error('❌ Write Database failed: ', e);
		} finally {
			this.isWriting = false;
			if (this.writePending) {
				this.writePending = false;
				await this.write(this.data);
			}
		}
	}
}

module.exports = StoreDB;