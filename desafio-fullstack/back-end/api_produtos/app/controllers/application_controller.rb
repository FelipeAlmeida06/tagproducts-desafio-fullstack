class ApplicationController < ActionController::API
    before_action :verificar_api_key

    private

    def verificar_api_key
        api_key = request.headers['HTTP_X_API_KEY']
    
        unless api_key == 'tagview-desafio-2024'
          render json: { 
            erro: 'Acesso não autorizado',
            detalhes: ['API Key inválida'] 
          }, status: :unauthorized
        end
    end
end
