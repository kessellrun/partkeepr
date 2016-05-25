<?php

/* @Framework/Form/form_widget.html.php */
class __TwigTemplate_be7f78189c37573902a5516a608aad52c89b6eb8adb163c05d407a15ee37079e extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_a6d2eb32bddae84bb51695ee477be77780827c35683288090ed19cc09f75622b = $this->env->getExtension("native_profiler");
        $__internal_a6d2eb32bddae84bb51695ee477be77780827c35683288090ed19cc09f75622b->enter($__internal_a6d2eb32bddae84bb51695ee477be77780827c35683288090ed19cc09f75622b_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/form_widget.html.php"));

        // line 1
        echo "<?php if (\$compound): ?>
<?php echo \$view['form']->block(\$form, 'form_widget_compound')?>
<?php else: ?>
<?php echo \$view['form']->block(\$form, 'form_widget_simple')?>
<?php endif ?>
";
        
        $__internal_a6d2eb32bddae84bb51695ee477be77780827c35683288090ed19cc09f75622b->leave($__internal_a6d2eb32bddae84bb51695ee477be77780827c35683288090ed19cc09f75622b_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/form_widget.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php if ($compound): ?>*/
/* <?php echo $view['form']->block($form, 'form_widget_compound')?>*/
/* <?php else: ?>*/
/* <?php echo $view['form']->block($form, 'form_widget_simple')?>*/
/* <?php endif ?>*/
/* */
