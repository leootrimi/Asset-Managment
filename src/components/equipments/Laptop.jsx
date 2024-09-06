import React from 'react'

function Laptop() {
  return (
    <div>
      <fieldset className="m border rounded p-3 mt-3">
        <legend className="px-2">Laptop Specifications</legend>

        <form className="d-flex flex-row justify-content-between gap-2 col-12">
          <div className="left-column d-flex flex-column col-6">
            <div className="form-group mb-2">
              <label htmlFor="processor">Processor:</label>
              <input type="text" className="form-control" id="processor" placeholder="e.g., Intel Core i7" />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="ram">RAM (GB):</label>
              <input type="number" className="form-control" id="ram" placeholder="e.g., 16" />
            </div>
          </div>

          <div className="right-column d-flex flex-column col-6">
            <div className="form-group mb-2">
              <label htmlFor="storage">Storage (GB):</label>
              <input type="number" className="form-control" id="storage" placeholder="e.g., 512" />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="os">Operating System:</label>
              <input type="text" className="form-control" id="os" placeholder="e.g., Windows 11 Pro" />
            </div>
          </div>
        </form>
      </fieldset>
    </div>
  )
}

export default Laptop
