import { Request, Response } from 'express';
import { DatabaseManager } from '../database/DatabaseManager';
import { CreateTestTableDto, UpdateTestTableDto } from 'db';

export class TestTableController {
  private databaseManager: DatabaseManager;

  constructor() {
    this.databaseManager = DatabaseManager.getInstance();
  }

  // POST /api/test-table
  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: CreateTestTableDto = req.body;
      const result = await this.databaseManager.testTableService.createTestEntry(data);
      
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // GET /api/test-table
  public getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const results = await this.databaseManager.testTableService.getAllTestEntries();
      
      res.json({
        success: true,
        data: results,
        count: results.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // GET /api/test-table/:id
  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.databaseManager.testTableService.getTestEntryById(id);
      
      if (!result) {
        res.status(404).json({
          success: false,
          error: 'Test entry not found',
        });
        return;
      }

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // PUT /api/test-table/:id
  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data: UpdateTestTableDto = req.body;
      const result = await this.databaseManager.testTableService.updateTestEntry(id, data);
      
      if (!result) {
        res.status(404).json({
          success: false,
          error: 'Test entry not found',
        });
        return;
      }

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // DELETE /api/test-table/:id
  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const success = await this.databaseManager.testTableService.deleteTestEntry(id);
      
      res.json({
        success: success,
        message: success ? 'Test entry deleted successfully' : 'Failed to delete test entry',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // GET /api/test-table/search/:name
  public searchByName = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.params;
      const results = await this.databaseManager.testTableService.searchTestEntriesByName(name);
      
      res.json({
        success: true,
        data: results,
        count: results.length,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
}
