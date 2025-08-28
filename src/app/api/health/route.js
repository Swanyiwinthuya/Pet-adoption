import { NextResponse } from 'next/server';
import { checkDBHealth } from '../../../lib/db';

// GET /api/health - Health check endpoint
export async function GET() {
  try {
    // Check database health
    const dbHealth = await checkDBHealth();
    
    // Check system health
    const systemHealth = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: dbHealth
    };
    
    // Determine overall status
    const overallStatus = dbHealth.status === 'healthy' ? 'healthy' : 'unhealthy';
    const statusCode = overallStatus === 'healthy' ? 200 : 503;
    
    return NextResponse.json(systemHealth, { status: statusCode });
    
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
      database: { status: 'unhealthy', message: 'Connection failed' }
    }, { status: 503 });
  }
}
