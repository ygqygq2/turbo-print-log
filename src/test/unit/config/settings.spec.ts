import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DEFAULT_CONFIG } from '../../../config/defaults';

// Mock vscode module
vi.mock('vscode', () => ({
  workspace: {
    getConfiguration: vi.fn(() => ({
      get: vi.fn((key: string, defaultValue: any) => defaultValue),
    })),
  },
}));

describe('ConfigManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getConfig', () => {
    it('应该返回配置包含所有必需属性', async () => {
      const { ConfigManager } = await import('../../../config/settings');
      const config = ConfigManager.getConfig();

      expect(config).toHaveProperty('prefix');
      expect(config).toHaveProperty('separator');
      expect(config).toHaveProperty('logFunction');
      expect(config).toHaveProperty('quote');
      expect(config).toHaveProperty('suffix');
      expect(config).toHaveProperty('addSemicolon');
      expect(config).toHaveProperty('includeFileInfo');
    });
  });
});

describe('DEFAULT_CONFIG', () => {
  it('应该有正确的默认值', () => {
    expect(DEFAULT_CONFIG.prefix).toBe('🚀');
    expect(DEFAULT_CONFIG.separator).toBe('~');
    expect(DEFAULT_CONFIG.quote).toBe('"');
    expect(DEFAULT_CONFIG.suffix).toBe(':');
    expect(DEFAULT_CONFIG.includeFileInfo).toBe(true);
    expect(DEFAULT_CONFIG.addSemicolon).toBe(undefined);
  });

  it('logFunction应该是空对象', () => {
    expect(DEFAULT_CONFIG.logFunction).toEqual({});
  });
});
