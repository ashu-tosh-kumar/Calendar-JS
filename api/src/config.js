/**
 * Base Config class
 */
class Config {
  /**
   * Constructor for class `Config`
   */
  constructor () {
    this.ENV = null
  }
}

/**
 * Development Config class
 */
class DevelopmentConfig extends Config {
  /**
   * Constructor for class `DevelopmentConfig`
   */
  constructor () {
    super()
    this.ENV = 'development'
  }
}

/**
 * DevelopmentConfig Config class
 */
class ProductionConfig extends Config {
  /**
   * Constructor for class `ProductionConfig`
   */
  constructor () {
    super()
    this.ENV = 'production'
  }
}

const envConfigMapping = {
  production: ProductionConfig,
  development: DevelopmentConfig
}
const currEnv = process.env.env || 'development'
export const config = envConfigMapping[currEnv]()
